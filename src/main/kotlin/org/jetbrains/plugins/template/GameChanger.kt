package org.jetbrains.plugins.template

import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.jsonBody
import com.google.gson.Gson
import com.intellij.ide.BrowserUtil
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.fileTypes.FileTypeManager
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.VirtualFile
import com.intellij.psi.search.FileTypeIndex
import com.intellij.psi.search.GlobalSearchScope.projectScope
import org.jetbrains.plugins.template.services.CentralIntelligenceAgency.Companion.getExtraTimeSpent
import javax.xml.bind.DatatypeConverter.parseInteger

class GameChanger : AnAction() {
    private var array = ArrayList<Int>()

    init {

    }

    override fun actionPerformed(event: AnActionEvent) {
        val time = getExtraTimeSpent()
        if (time < 0L) return

        val project: Project? = event.project;
        if (project == null) {
            println("null project, wtf??")
        }

        project?.let {
            val javaFileType = FileTypeManager.getInstance().getFileTypeByExtension("java")
            val virtualFiles = FileTypeIndex.getFiles(javaFileType, projectScope(project))

            // Perform analysis on each file
            virtualFiles.forEach { file ->
                analyseFile(file, virtualFiles.indexOf(file) +1 == virtualFiles.size, (time / (60000 * 15)).toInt() + 1)
            }
        }
    }

    private fun analyseFile(file: VirtualFile, length:Boolean, time: Int) {
        return openAIInterface(file.contentsToByteArray().toString(Charsets.UTF_8), length, time)
    }
    private fun openAIInterface(code: String, length:Boolean, time: Int) {
        val role = "You are a grader that grades java code on code quality with an integer grade from 0 (lowest) to 100 (highest). You can ONLY send a number, and nothing else."
        val c = Gson().toJson(code)

        Fuel.post("https://api.openai.com/v1/chat/completions")
                .set(Headers.AUTHORIZATION, "Bearer")
                .jsonBody("{ \"model\": \"gpt-4o\", \"messages\": [ { \"role\": \"system\", \"content\": \"" + role + "\" }, {\"role\": \"user\", \"content\": "+c+" }]}")
                .response { result -> parseResult(result.component1(), length, time) }

    }

    private fun parseResult(result: ByteArray?, length: Boolean, time: Int) {
        if(result == null) println("null result")
        else {
            val str = result.toString(Charsets.UTF_8)
            val list = str.split("content\": \"", "\"\n" +
                    "      },\n" +
                    "      \"logprobs\":")
            array.add(parseInteger(list.get(1)).toInt())

            if(length){
                computeResult(time)
            }
        }
    }

    private fun computeResult(time: Int) {
        val score = array.sum() / array.size
        array = ArrayList<Int>()
        BrowserUtil.browse("http://localhost:8080/?score=" + score*time)
    }
}

data class Response (
    val id: String,
    val `object`: String,
    val created: Int,
    val model: String,
    val system_fingerprint: String,
    val choices: Choices,
    val usage: Usage,
)

data class Choices (
    val index: Int,
    val message: Message,
    val logprobs: Any,
    val finish_reason: String
)

data class Message (
    val role: String,
    val content: String
)

data class Usage (
    val prompt_tokens: Int,
    val compilation_tokens: Int,
    val total_tokens: Int
)

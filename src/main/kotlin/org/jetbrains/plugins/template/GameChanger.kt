package org.jetbrains.plugins.template

import com.github.kittinunf.fuel.Fuel
import com.github.kittinunf.fuel.core.FuelError
import com.github.kittinunf.fuel.core.Headers
import com.github.kittinunf.fuel.core.extensions.jsonBody
import com.intellij.codeInspection.InspectionManager
import com.intellij.ide.BrowserUtil
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.project.Project
import com.jetbrains.rd.util.string.println
import org.jetbrains.io.response
import org.jetbrains.plugins.template.services.CentralIntelligenceAgency.Companion.getExtraTimeSpent

class GameChanger : AnAction() {
    //private var centralIntelligenceAgency: CentralIntelligenceAgency

    init {
        println("Ive been here the whoooole time")
    }

    override fun actionPerformed(event: AnActionEvent) {
        val time = getExtraTimeSpent()
        println(time)
        if (time < 0L) return

        val project: Project? = event.project;
        if (project == null) {
            println("null project, wtf??")
        }

        val manager: InspectionManager = InspectionManager.getInstance(project)

        // figure out how to get the PsiFiles
        //val files = event.getData(CommonDataKeys.)

        openAIInterface()

        //for ()

        //TODO: analyse code quality and pass it to OpenAI to get number of tokens
        BrowserUtil.browse("http://localhost:8080")
    }

    private fun openAIInterface() {
        Fuel.post("https://api.openai.com/v1/chat/completions")
                .set(Headers.AUTHORIZATION, "Bearer ")
                .jsonBody("{ \"model\": \"gpt-4o\", \"messages\": [ { \"role\": \"system\", \"content\": \"You are a helpful assistant.\"}, {\"role\": \"user\", \"content\": \"Hello!\"}]}")
                .response { result -> parseResult(result.component1()) }

    }

    private fun parseResult(result: ByteArray?) {
        if(result == null) println("null result")
        else {
            println(result.toString(Charsets.UTF_8))
        }
    }
}
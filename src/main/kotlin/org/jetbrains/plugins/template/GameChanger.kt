package org.jetbrains.plugins.template

import com.intellij.ide.BrowserUtil
import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import org.jetbrains.plugins.template.services.CentralIntelligenceAgency
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


        //TODO: analyse code quality and pass it to OpenAI to get number of tokens
        BrowserUtil.browse("http://localhost:8080")
    }
}
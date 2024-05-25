package org.jetbrains.plugins.template.listeners

import TimeService
import com.intellij.openapi.application.ApplicationActivationListener
import com.intellij.openapi.diagnostic.thisLogger
import com.intellij.openapi.wm.IdeFrame
import com.intellij.openapi.wm.WindowManager

internal class MyApplicationActivationListener : ApplicationActivationListener {

    val timeService = TimeService()

    override fun applicationActivated(ideFrame: IdeFrame) {
        timeService.setSessionStartTime()
    }

    override fun applicationDeactivated(ideFrame: IdeFrame) {
        timeService.setRecordedTime()
    }
}

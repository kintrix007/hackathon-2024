package org.jetbrains.plugins.template.listeners

import com.intellij.openapi.application.ApplicationActivationListener
import com.intellij.openapi.wm.IdeFrame
import org.jetbrains.plugins.template.services.CentralIntelligenceAgency

internal class Listener : ApplicationActivationListener {

    var centralIntelligenceAgency: CentralIntelligenceAgency

    init {
        centralIntelligenceAgency = CentralIntelligenceAgency()
    }

    override fun applicationActivated(ideFrame: IdeFrame) {
        centralIntelligenceAgency.setSessionStartTime()
    }

    override fun applicationDeactivated(ideFrame: IdeFrame) {
        centralIntelligenceAgency.updateRecordedTime()
    }
}

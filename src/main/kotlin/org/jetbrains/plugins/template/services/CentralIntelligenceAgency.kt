package org.jetbrains.plugins.template.services

import com.intellij.openapi.components.Service
import org.jetbrains.plugins.template.GameChanger
import org.jetbrains.plugins.template.Timer

@Service
class CentralIntelligenceAgency {

    companion object {
        fun getExtraTimeSpent(): Long {
            return Timer.updateRecordedTime() - 60000 * 1 //This is currently 1 minute (should be 30)
        }
    }

    fun updateRecordedTime() {
        Timer.updateRecordedTime()
    }

    fun setSessionStartTime() {
        Timer.setSessionStartTime()
    }
}

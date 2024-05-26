package org.jetbrains.plugins.template.services

import com.intellij.openapi.components.Service
import org.jetbrains.plugins.template.GameChanger
import org.jetbrains.plugins.template.Timer

@Service
class CentralIntelligenceAgency {

    //KotlinDoc: Do not do this
    /**
     * This is a terrible way to do static methods
     */
    companion object {

        fun getExtraTimeSpent(): Long {
            return Timer.updateRecordedTime() - 1000 * 1 //This is currently 1 minute (should be 30 minutes)
        }
    }

    fun updateRecordedTime() {
        Timer.updateRecordedTime()
    }

    fun setSessionStartTime() {
        Timer.setSessionStartTime()
    }
}

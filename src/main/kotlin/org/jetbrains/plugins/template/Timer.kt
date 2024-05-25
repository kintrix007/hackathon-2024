package org.jetbrains.plugins.template

import org.jetbrains.plugins.template.services.CentralIntelligenceAgency

class Timer {
    companion object {

        private var recordedTime = 0L
        private var sessionStartTime: Long

        init {
            sessionStartTime = System.currentTimeMillis()
        }

        fun setSessionStartTime() {
            sessionStartTime = System.currentTimeMillis()
        }

        fun updateRecordedTime(): Long {
            recordedTime += (System.currentTimeMillis() - sessionStartTime)
            sessionStartTime = System.currentTimeMillis()
            return recordedTime
        }
    }
}
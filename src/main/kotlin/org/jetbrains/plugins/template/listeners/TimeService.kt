import com.intellij.openapi.components.Service

@Service
class TimeService {
    var recordedTime = 0L
    var sessionStartTime: Long
    //var timer: Timer

    init {
        //val frames = WindowManager.getInstance().allProjectFrames
        //frames.forEach { frame ->
        //    frame.component.addKeyListener(this)
        //    frame.component.addMouseListener(this)
        //    frame.component.addMouseMotionListener(this)
        //}
        //timer = Timer(true)

        sessionStartTime = System.currentTimeMillis()

        //timer.scheduleAtFixedRate(object : TimerTask() {
        //    override fun run() {
        //        val currentTime = System.currentTimeMillis()
        //        if (currentTime - lastActivity < 60000) {
        //            time++
        //            println(time)
        //        }
        //
        //    }
        //}, 60000, 60000)
    }

    fun setSessionStartTime() {
        sessionStartTime = System.currentTimeMillis()
    }

    fun setRecordedTime() {
        recordedTime += (System.currentTimeMillis() - sessionStartTime)
        sessionStartTime = System.currentTimeMillis()
    }

    //fun dispose() {
    //    timer.cancel()
    //}
}
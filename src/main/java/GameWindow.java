import com.intellij.ide.BrowserUtil;
import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;

public class GameWindow extends AnAction {

    public GameWindow() {

    }

    @Override
    public void actionPerformed(AnActionEvent event) {
        BrowserUtil.browse("http://localhost:8080");
    }
}

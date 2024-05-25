import com.intellij.ide.BrowserUtil;
import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;

public class GameWindow extends AnAction {

    @Override
    public void actionPerformed(AnActionEvent event) {
        //TODO: analyse code quality and pass it to OpenAI to get number of tokens
        BrowserUtil.browse("http://localhost:8080");
    }
}

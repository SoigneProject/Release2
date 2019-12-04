import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LogoutTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32\\chromedriver.exe");

		//Open the Chrome browser.
		driver = new ChromeDriver();

		//Maximize the browser window.
		driver.manage().window().maximize();

		//Navigate the driver to the user's profile page.
		driver.navigate().to("http://localhost:3000/");

		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

		//Tests the Logout button.
		if (testLogout()) {
			System.out.println("Logout Test: Successful");
		}
		else {
			System.out.println("Logout Test: Failed");
		}
		
		driver.close();
		driver.quit();
	}

	private static boolean testLogout() {
		try {
			//Click on the Logout button.
			driver.findElement(By.cssSelector("#root > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-4 > div:nth-child(2) > button")).click();

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

			return true;
		}
		catch (final Exception e) {
			System.out.println(e.getClass().toString());
			return false;
		}
	}
}

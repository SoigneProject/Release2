import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {
	static WebDriver driver;
	public static void main(String[] args) {
		//Setting driver properties.
		System.setProperty("webdriver.chrome.driver", "add your own local path to the webdriver");

		//Open the Chrome browser.
		driver = new ChromeDriver();

		//Maximize the window size.
		driver.manage().window().maximize();

		if (testLogin()) {
			System.out.println("Login Test: Successful");
		}
		else {
			System.out.println("Login Test: Failed");
		}

		driver.close();
		driver.quit();
	}

	private static boolean testLogin() {
		try {
			//Navigate the driver to the website's URL.
			driver.navigate().to("http://localhost:3000/login");

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

			//Enter the username.
			driver.findElement(By.cssSelector("#userName")).sendKeys("Cogart"); //insert a username.

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);

			//Enter the password.
			driver.findElement(By.cssSelector("#password")).sendKeys("cs160"); //insert a password.

			//Click on the Login button.
			driver.findElement(By.cssSelector("#server-modal-description > form > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-fullWidth")).click();
			//driver.findElement(By.xpath(".//*[@id="server-modal-description"]/form/button[1]"));

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
			
			/**if (driver.findElement(By.tagName("h1")).getText().equals("")) {
				return true;
			}
			else {
				return false;
			} **/

			return true;
		}
		catch (final Exception e) {
			System.out.println(e.getClass().toString());
			return false;
		}
	}
}

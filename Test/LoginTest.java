import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32\\chromedriver.exe");

		//Open the Chrome browser.
		driver = new ChromeDriver();

		//Maximize the browser window.
		driver.manage().window().maximize();

		//Navigate the driver to the website's URL.
		driver.navigate().to("http://localhost:3000/login");

		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

		//Tests the SignUp portion.
		if (testLogin()) {
			System.out.println("Login Test: Successful");
		}
		else {
			System.out.println("Login Test: Failed");
		}
		
		//Tests the Not A Member? Sign Up Button.
		//Result is False is Login Test is True.
		if (testSignUp()) {
			System.out.println("Not A Member? Sign Up Button Test: Successful");
		}
		else {
			System.out.println("Not A Member? Sign Up Button Test: Failed");
		}
		
		driver.close();
		driver.quit();
	}

	private static boolean testLogin() {
		try {
			//Enter the username.
			driver.findElement(By.cssSelector("#userName")).sendKeys("cs160"); //insert a username.

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);

			//Enter the password.
			driver.findElement(By.cssSelector("#password")).sendKeys("soigne!"); //insert a password.

			//Click on the Login button.
			driver.findElement(By.cssSelector("#server-modal-description > form > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-fullWidth")).click();

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);

			return true;
		}
		catch (final Exception e) {
			System.out.println(e.getClass().toString());
			return false;
		}
	}
	
	/**
	 * Test: Not A Member? Sign Up Button.
	 * Checks if user is directed to SignUp page.
	 * @return boolean 
	 */
	private static boolean testSignUp() {
		try {
			//Clicks Have An Account? Log In Button.
			driver.findElement(By.cssSelector("#server-modal-description > form > button:nth-child(5)")).click();
			
			//Wait for page to load.
			Thread.sleep(5000);
			
			if (driver.findElement(By.tagName("h2")).getText().equals("Enter your information and join our growing community!")) {
				return true;
			}
			else {
				return false;
			}
		}
		catch (final Exception e) {
			System.out.println(e.getClass().toString());
			return false;			
		}
	}		
}

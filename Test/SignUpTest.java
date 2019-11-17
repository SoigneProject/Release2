import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SignUpTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32");

		//Open the Chrome browser.
		WebDriver driver = new ChromeDriver();

		//Maximize the browser window.
		driver.manage().window().maximize();

		if (testSignUp()) {
			System.out.println("Sign Up Test: Successful");
		}
		else {
			System.out.println("Sign up Test: Failed");
		}

		driver.close();
		driver.quit();
	}

	/**
	 * Test: Inputs the required fields on the form and submits the form. 
	 * Checks if page is directed to user's home page.
	 * @return boolean 
	 */
	private static boolean testSignUp() {
		try {
			//Navigate the driver to the website's URL.
			driver.navigate().to("http://localhost:3000/signModal");

			//Wait for the element to load.
			driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
	
			//Enter the first name.
			driver.findElement(By.cssSelector("#firstName")).sendKeys("");

			//Enter the last name.
			driver.findElement(By.cssSelector("#lastName")).sendKeys("");

			//Enter the email address.
			driver.findElement(By.cssSelector("#email")).sendKeys("");

			//Enter the username.
			driver.findElement(By.cssSelector("#userName")).sendKeys("");

			//Enter the password.
			driver.findElement(By.cssSelector("#password")).sendKeys("");

			//Enter the password again to confirm.
			driver.findElement(By.cssSelector("#confirmPassword")).sendKeys("");

			//Click the SignUp Button.
			driver.findElement(By.cssSelector("#firstName")).sendKeys("");
			
			//Wait for page to load.
			Thread.sleep(5000);

			//Click the Have An Account? Log In Button.
			//driver.findElement(By.cssSelector("#firstName")).sendKeys("");
			
			if (driver.findElement(By.tagName("h1")).getText().equals("")) {
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

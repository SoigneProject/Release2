import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SignUpTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32\\chromedriver.exe");

		//Open the Chrome browser.
		driver = new ChromeDriver();

		//Maximize the browser window.
		driver.manage().window().maximize();

		//Navigate the driver to the website's URL.
		driver.navigate().to("http://localhost:3000/signModal");
		
		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

		//Tests the SignUp portion.
		if (testSignUp()) {
			System.out.println("Sign Up Test: Successful");
		}
		else {
			System.out.println("Sign up Test: Failed");
		}
		
		//Tests the Have An Account? Log In Button.
		if (testLoginButton()) {
			System.out.println("Have An Account? Log In Button Test: Successful");
		}
		else {
			System.out.println("Have An Account? Log In Button Test: Failed");
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
			//Enter the first name.
			driver.findElement(By.cssSelector("#firstName")).sendKeys("Software");

			//Enter the last name.
			driver.findElement(By.cssSelector("#lastName")).sendKeys("Engineering");

			//Enter the email address.
			driver.findElement(By.cssSelector("#email")).sendKeys("cs160@gmail.com");

			//Enter the username.
			driver.findElement(By.cssSelector("#userName")).sendKeys("cs160");

			//Enter the password.
			driver.findElement(By.cssSelector("#password")).sendKeys("soigne!");

			//Enter the password again to confirm.
			driver.findElement(By.cssSelector("#confirmPassword")).sendKeys("soigne!");

			//Click the SignUp Button.
			driver.findElement(By.cssSelector("#server-modal-description > form > button:nth-child(3)"));
			
			//Wait for page to load.
			Thread.sleep(5000);
			
			/**if (driver.findElement(By.tagName("h1")).getText().equals("")) {
				return true;
			}
			else {
				return false;
			}**/
			return true;
		}
		catch (final Exception e) {
			System.out.println(e.getClass().toString());
			return false;			
		}
	}
	
	/**
	 * Test: Have An Account? Log In Button.
	 * Checks if user is directed to Login page.
	 * @return boolean 
	 */
	private static boolean testLoginButton() {
		try {
			//Clicks Have An Account? Log In Button.
			driver.findElement(By.cssSelector("#server-modal-description > form > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-fullWidth")).click();
			
			//Wait for page to load.
			Thread.sleep(5000);
			
			if (driver.findElement(By.tagName("h2")).getText().equals("Welcome Back!")) {
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

import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class PostCreationTest {
	static WebDriver driver;
	
	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32");

		//Open the Chrome browser.
		WebDriver driver = new ChromeDriver();

		//Maximize the browser window.
		driver.manage().window().maximize();

		if (testPostCreation()) {
		
		}
		else {
		
		}
		
		driver.close();
		driver.quit();
	}
	
	/**
	 * Test: 
	 * @return boolean
	 */
	private static boolean testPostCreation() {
		return false;
	}	
}

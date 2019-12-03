import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SearchBarTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "add your own local path to the webdriver");

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
	private static boolean testSearchBar() {
		return false;
	}
}

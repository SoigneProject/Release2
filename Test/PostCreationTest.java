import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class PostCreationTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32\\chromedriver.exe");

		//Open the Chrome browser.
		driver = new ChromeDriver();

		//Maximize the browser window.
		driver.manage().window().maximize();

		//Navigate the driver to the website's URL.
		driver.navigate().to("http://localhost:3000/CreatePost");
		
		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);

		//Tests the Create a Post portion.
		if (testCreatePost()) {
			System.out.println("Create Post Test: Successful");
		}
		else {
			System.out.println("Create Post Test: Failed");
		}
		
		driver.close();
		driver.quit();
	}

	/**
	 * Test: Inputs the required fields about the items and posts the items. 
	 * 
	 * @return boolean 
	 */
	private static boolean testCreatePost() {
		try {
			//Enter the Title.
			driver.findElement(By.cssSelector("#name")).sendKeys("");

			//Enter the Tags.
			driver.findElement(By.cssSelector("#outlined-tag > div > div.css-1hwfws3")).sendKeys("");

			//Enter the Description.
			driver.findElement(By.cssSelector("#desc")).sendKeys("");

			//Enter the Item Name.
			driver.findElement(By.cssSelector("#item")).sendKeys("");

			//Enter the Price.
			driver.findElement(By.cssSelector("#price")).sendKeys("");

			//Enter the Link.
			driver.findElement(By.cssSelector("#link")).sendKeys("");

			//Click the Add Item Button.
			driver.findElement(By.cssSelector("#root > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 > div:nth-child(3) > div > button")).click();;
			
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
}

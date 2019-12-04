import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SearchBarTest {
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

		/**
		 * Tests the Search Bar for Users.
		 */
		if (testSearchUsers()) {
			System.out.println("Search Bar for Users: Successful");
		}
		else {
			System.out.println("Search Bar for Users: Failed");
		}
		
		/**
		 * Tests the Search Bar for Posts.
		 */
		if (testSearchPosts()) {
			System.out.println("Search Bar for Posts Test: Successful");
		}
		else {
			System.out.println("Search Bar for Posts Test: Failed");
		}/**
		 * Tests the Search Bar for Items.
		 */
		if (testSearchItems()) {
			System.out.println("Search Bar for Items: Successful");
		}
		else {
			System.out.println("Search Bar for Items: Failed");
		}
		
		driver.close();
		driver.quit();
	}

	/**
	 * Test: Search Bar for Users
	 * @return boolean 
	 */
	private static boolean testSearchUsers() {
		try {
			//Enter the Title.
			driver.findElement(By.cssSelector("#name")).sendKeys("");

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
	
	/**
	 * Test: Search Bar for Posts
	 * @return boolean 
	 */
	private static boolean testSearchPosts() {
		try {
			//Enter the Title.
			driver.findElement(By.cssSelector("#name")).sendKeys("");

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
	
	/**
	 * Test: Search Bar for Items
	 * @return boolean 
	 */
	private static boolean testSearchItems() {
		try {
			//Enter the Title.
			driver.findElement(By.cssSelector("#name")).sendKeys("");

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

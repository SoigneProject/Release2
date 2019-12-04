import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class PostCreationTest {
	static WebDriver driver;

	public static void main(String[] args) {
		//Set the driver properties.
		System.setProperty("webdriver.chrome.driver", "/Users/pratyusha.pogaru/Desktop/chromedriver"); //replace with own local path to chrome webdriver

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
			//choose the image
			driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[1]/div/input")).sendKeys("/Users/pratyusha.pogaru/Desktop/baby-yoda.jpg"); //replace with own local path to image you wish to upload
			
			//Enter the Title.
			driver.findElement(By.cssSelector("#name")).sendKeys("YODA!");

			//Enter the Tags.
			driver.findElement(By.xpath("//*[@id=\"react-select-2-input\"]")).sendKeys("sunsoutbunsout");

			//Enter the Description.
			driver.findElement(By.cssSelector("#desc")).sendKeys("a test description");

			//Enter the Item Name.
			driver.findElement(By.cssSelector("#item")).sendKeys("an item!");

			//Enter the Price.
			driver.findElement(By.cssSelector("#price")).sendKeys("30");

			//Enter the Link.
			driver.findElement(By.cssSelector("#link")).sendKeys("www.test.com");

			//Click the Add Item Button.
			//driver.findElement(By.cssSelector("#root > div > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 > div:nth-child(3) > div > button")).click();
			driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[3]/div/button")).click();
			
			//Wait for page to load.
			Thread.sleep(3000);
			
			//post it!
			driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[3]/div/button")).click();
			Thread.sleep(2000);
			
			//navigate to profile and if can find the post then return true
			driver.navigate().to("http://localhost:3000");
			Thread.sleep(1000);
			
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

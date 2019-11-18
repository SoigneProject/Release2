import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginTest {
	public static void main(String[] args) {
		//Setting driver properties.
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\sssup\\OneDrive\\Documents\\Soigne Test\\chromedriver_win32");
		WebDriver driver = new ChromeDriver();
		
		//Navigate the driver to the website's URL.
		driver.navigate().to("http://localhost:3000/Login");
		driver.manage().window().maximize();
		
		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
		
		//Enter the username.
		driver.findElement(By.cssSelector("#userName")).sendKeys(""); //insert a username.
		
		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);
				
		//Enter the password.
		driver.findElement(By.cssSelector("#password")).sendKeys(""); //insert a password.
		
		//Click on the Login button.
		driver.findElement(By.cssSelector("#server-modal-description > form > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-fullWidth")).click();
		//driver.findElement(By.xpath(".//*[@id="server-modal-description"]/form/button[1]"));
		
		//Wait for the element to load.
		driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
		
		driver.close();
		driver.quit();
	}
}

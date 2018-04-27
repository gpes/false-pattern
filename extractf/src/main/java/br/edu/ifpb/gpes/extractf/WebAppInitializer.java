
package br.edu.ifpb.gpes.extractf;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

/**
 *
 * @author natan
 */
@Configuration
@EnableWebMvc
@ComponentScan("br.edu.ifpb.gpes.extractf")
public class WebAppInitializer implements WebApplicationInitializer {
    
    @Override
    public void onStartup(ServletContext servletContext) {
        AnnotationConfigWebApplicationContext applicationContext =
                new AnnotationConfigWebApplicationContext();
        applicationContext.register(WebAppInitializer.class);

        servletContext.addListener(new ContextLoaderListener(applicationContext));
        ServletRegistration.Dynamic dispatcher = servletContext
                .addServlet("dispatcher", new DispatcherServlet(applicationContext));
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
    }
}

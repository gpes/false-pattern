
package br.edu.ifpb.gpes.extractf.readers;

import br.edu.ifpb.gpes.extractf.models.Instance;
import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.Role;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

/**
 *
 * @author natan
 */
public class FilePatternDetection {
    
    private File filePath;

    public FilePatternDetection() {
        this(new File("../output/axion-1.0-M2/axion-1.0-M2.xml"));
    }

    public FilePatternDetection(File filePath) {
        this.filePath = filePath;
    }
    
    public List<PatternDetection> readOutput() throws JDOMException, IOException {
        List<PatternDetection> patternDetections = new ArrayList<>();
        
        SAXBuilder builder = new SAXBuilder();
        
        // Lendo o arquivo xml
        Document document = (Document) builder.build(this.filePath);
        
        // Element System (Root)
        Element rootElement = (Element) document.getRootElement();
        
        // Element Pattern
        List<Element> patterns = rootElement.getChildren();
        patterns.stream().forEach(pattern -> {
            // Nome do padrao
            String name = pattern.getAttributeValue("name");
            
//            System.out.println("\n" + name);
            
            // Instanciando objeto da que representa cada detecção de padrão
            PatternDetection patternDetection = new PatternDetection(name);
            
            List<Element> instances = pattern.getChildren();
            instances.stream().forEach(instance -> {
                
//                System.out.println("");    
                Instance instancePattern = new Instance();
                
                List<Element> roles = instance.getChildren();
                roles.stream().forEach(role -> {
                    String nameRole = role.getAttributeValue("name");
                    String elementRole = role.getAttributeValue("element");
                    
//                    System.out.println("\t " + nameRole + "  -  " + elementRole);

                    Role roleInstance = new Role(nameRole, elementRole);
                    
                    instancePattern.addRole(roleInstance);
                });
                
                patternDetection.addInstance(instancePattern);
//                System.out.println("");
            });
            
            patternDetections.add(patternDetection);
        });
        
        return patternDetections;
    }
    
}

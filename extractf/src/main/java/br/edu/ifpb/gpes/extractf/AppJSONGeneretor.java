
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FileProjectNames;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import org.jdom2.JDOMException;
import org.json.JSONObject;

/**
 *
 * @author natan
 */
public class AppJSONGeneretor {
    public static void main(String[] args) throws JDOMException, IOException {
        FilePatternDetection filePatternDetection = new FilePatternDetection();
        List<PatternDetection> patternDetections = filePatternDetection.readOutput();
        
        FileTermsCounter fileTermsCounter = new FileTermsCounter();
        List<TermsCounter> termsCounters = fileTermsCounter.consumeOutput();
    
//        FileProjectNames fileProjectNames = new FileProjectNames();
//        List<String> readFile = filePrjiojectNames.readFile();
     
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("patterns", patternDetections);
        jsonObject.put("terms", termsCounters);
        
        try (FileWriter fileWriter = new FileWriter("teste/axion.json")) {
            fileWriter.write(jsonObject.toString());
        }
        
//        System.out.println(readFile);
    }
}

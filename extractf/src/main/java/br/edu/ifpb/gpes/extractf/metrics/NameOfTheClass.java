
package br.edu.ifpb.gpes.extractf.metrics;

import br.edu.ifpb.gpes.extractf.models.PatternsPerTerms;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author natan
 */
public class NameOfTheClass {
    
    public NameOfTheClass() {
        
    }
    
    public Map<String, Integer> metricCalcule(List<PatternsPerTerms> patternsPerTermsList, String projectName, List<String> catalog) {
        
        Map<String, Integer> classPerMetric = new HashMap<>();
        
        StringBuilder builder = new StringBuilder();
        
        patternsPerTermsList.stream().forEach(ppt -> {
            // Metodo para calcula a frequecia de cada ppt
            List<String> result = this.calcFrequency(ppt);
            String[] parts = ppt.getClassName().split("\\.");
            String className = parts[parts.length - 1];
            
            int sumVerifyInClassName = this.verifyInClassName(result, className);
            
            int sumVerifyInCatalog = this.verifyInCatalog(result, catalog);
            
            int resultMetric = sumVerifyInClassName + sumVerifyInCatalog;
            
            classPerMetric.put(ppt.getClassName(), resultMetric);
            
            String line = String.format("%s; %d; %s; %s;\n", className, resultMetric, ppt.getNamePattern(), projectName);
            builder.append(line);
        });
        
        Path path = Paths.get("metric_" + projectName + ".csv");
        
        try {
            Files.write(path, builder.toString().getBytes());
        } catch (IOException ex) {
            Logger.getLogger(NameOfTheClass.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return classPerMetric;
    }
    
    // Retorna uma lista de Stirng com os termos que serao checados nome da classe e catalogo
    private List<String> calcFrequency(PatternsPerTerms ppt) {
        int sumTerms = 0;
        
        for(Map.Entry<String, Integer> entry: ppt.getTerms().getTermsWithCounter().entrySet()) {
            sumTerms += entry.getValue();
        }
//        System.out.println("sumTerms: " + sumTerms);
        
        // valor do maior termo
        int firstTermValue = ppt.getTerms().getTermsWithCounter().entrySet().iterator().next().getValue();
//        System.out.println("firstTermValue: " + firstTermValue);
        
        // frequencia base
        double baseFrenquency = (((double) firstTermValue) / sumTerms) - 0.01;
//        System.out.println("baseFrequency: " + baseFrenquency);
        
        // Ira conter uma lista com termos que atendem o requisito da frequencia
        List<String> termsList = new ArrayList<>();
                
        for(Map.Entry<String, Integer> entry: ppt.getTerms().getTermsWithCounter().entrySet()) {
            double termFrequency = ((double) entry.getValue()) / sumTerms;
            
            if(termFrequency >= baseFrenquency) {
//                System.out.println("\ttermFrequency: " + termFrequency + "  term: " + entry.getKey());
                termsList.add(entry.getKey());
            }
        }
        
        return termsList;
    
    }
    
    private int verifyInClassName(List<String> termsList, String className) {
        int sum = 0;
        
        for(String term: termsList) {
            if(className.toLowerCase().contains(term)) {
                sum += 1;
            }
        }
        
        return sum;
    }
    
    private int verifyInCatalog(List<String> termsList, List<String> catalog) {
        int sum = 0;
        
        for(String term: termsList) {
            for(String cat: catalog) {
                if(term.toLowerCase().contains(cat)) sum += 1;
            }
        }
        
        return sum;
    }
}

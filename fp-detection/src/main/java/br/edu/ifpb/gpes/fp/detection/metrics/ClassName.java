/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.fp.detection.metrics;

import br.edu.ifpb.gpes.shared.TermsCounter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author natan
 * Classe copia da metrica NameOfTheClass adaptada para algumas validaçoes do Artigo Principia/RITA
 */
public class ClassName {
    public ClassName() {
        
    }
    
    public Map<String, Integer> metricCalcule(List<TermsCounter> termsCounter, List<String> catalog) {
        
        Map<String, Integer> classPerMetric = new HashMap<>();
        
        StringBuilder builder = new StringBuilder();
        
        termsCounter.stream().forEach(ppt -> {
            // Metodo para calcula a frequecia de cada ppt
            List<String> result = this.calcFrequency(ppt);
            String[] parts = ppt.getEntityName().split("\\.");
            String className = parts[parts.length - 1];
            
            int sumVerifyInClassName = this.verifyInClassName(result, className);
            
            int sumVerifyInCatalog = this.verifyInCatalog(result, catalog);
            
            int resultMetric = sumVerifyInClassName + sumVerifyInCatalog;
            
            if(resultMetric > 0) classPerMetric.put(ppt.getEntityName(), resultMetric);
            
            String line = String.format("%s; %d;\n", className, resultMetric);
            builder.append(line);
        });
        
//        Path path = Paths.get("metric_" + projectName + ".csv");
//        
//        try {
//            Files.write(path, builder.toString().getBytes());
//        } catch (IOException ex) {
//            Logger.getLogger(NameOfTheClass.class.getName()).log(Level.SEVERE, null, ex);
//        }
        
        return classPerMetric;
    }
    
    // Retorna uma lista de Stirng com os termos que serao checados nome da classe e catalogo
    private List<String> calcFrequency(TermsCounter ppt) {
        int sumTerms = 0;
        
        for(Map.Entry<String, Integer> entry: ppt.getTermsWithCounter().entrySet()) {
            sumTerms += entry.getValue();
        }
//        System.out.println("sumTerms: " + sumTerms);
        
        // valor do maior termo
        int firstTermValue = ppt.getTermsWithCounter().entrySet().iterator().next().getValue();
//        System.out.println("firstTermValue: " + firstTermValue);
        
        // frequencia base
        double baseFrenquency = (((double) firstTermValue) / sumTerms) - 0.01;
//        System.out.println("baseFrequency: " + baseFrenquency);
        
        // Ira conter uma lista com termos que atendem o requisito da frequencia
        List<String> termsList = new ArrayList<>();
                
        for(Map.Entry<String, Integer> entry: ppt.getTermsWithCounter().entrySet()) {
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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import br.edu.ifpb.gpes.extractf.utils.UtilClass;
import br.edu.ifpb.gpes.shared.PatternDetection;
import br.edu.ifpb.gpes.shared.PatternsPerTerms;
import br.edu.ifpb.gpes.shared.TermsCounter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdom2.JDOMException;

/**
 *
 * @author natan
 */
public class AppPatternsPerTerms {
    public static void main(String[] args) {
        try {
            List<PatternDetection> patternDetections = new FilePatternDetection().readOutput();
            List<TermsCounter> termsCounters = new FileTermsCounter().consumeOutput();
            
            List<PatternsPerTerms> patternsPerTermsList = new UtilClass().organizedPatternsPerTerms(patternDetections, termsCounters);
        
            // So preciso ter o nome da classe e os termos dela. (Entao, nao preciso ter uma Instance no HashMap)
//            patternsPerTermsList.forEach(ptt -> {
//                System.out.println(ptt.getNamePattern());
//                System.out.println(ptt.getClassName());
//                ptt.getTerms().getTermsWithCounter().forEach((key, value) -> {
//                    System.out.println("\t" + key + ": " + value);
//                });
//            });
        
            List<String> catalog = new ArrayList<>();
            catalog.add("factory");
            catalog.add("create");
//            new NameOfTheClass().metricCalcule(patternsPerTermsList, catalog);
        } catch (JDOMException | IOException ex) {
            Logger.getLogger(AppPatternsPerTerms.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        

    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.metrics.NameOfTheClass;
import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.PatternsPerTerms;
import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import br.edu.ifpb.gpes.extractf.utils.UtilClass;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdom2.JDOMException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author natan
 */
@Controller
@RequestMapping("/")
public class InitialController {
    
    @RequestMapping
    public String renderIndex() {
        return "/index.jsp";
    }
    
    @GetMapping("/terms")
    @ResponseBody
    public List<TermsCounter> getTerms() {
        try {
            return new FileTermsCounter().consumeOutput();
        } catch (IOException ex) {
            Logger.getLogger(InitialController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @GetMapping("/patterns")
    @ResponseBody
    public List<PatternDetection> getPatterns() {
        try {
            return new FilePatternDetection().readOutput();
        } catch (JDOMException | IOException ex) {
            Logger.getLogger(InitialController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }
    
    @PostMapping("/patterns")
    @ResponseBody
    public List<PatternDetection> getPatternsPost(@RequestBody String projectName) {
        try {
            return new FilePatternDetection(new File("../output/" + projectName + "/" + projectName + ".xml"))
                    .readOutput();
        } catch (JDOMException | IOException ex) {
            Logger.getLogger(InitialController.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    
    @PostMapping("/terms")
    @ResponseBody
    public List<TermsCounter> getTermsPost(@RequestBody String projectName) {
        try {
            return new FileTermsCounter(new File("../output/" + projectName + "/" + projectName + "_Matriz.csv"))
                    .consumeOutput();
        } catch (IOException ex) {
            Logger.getLogger(InitialController.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    
    @PostMapping("/metric")
    @ResponseBody
    public Map<String, Integer> getClassAndMetric(@RequestBody String projectName) {
        try {
            List<PatternDetection> patternDetections = new FilePatternDetection(new File("../output/" + projectName + "/" + projectName + ".xml"))
                    .readOutput();
            List<TermsCounter> termsCounters = new FileTermsCounter(new File("../output/" + projectName + "/" + projectName + "_Matriz.csv"))
                    .consumeOutput();
            
            // Retorna uma lista de classes juntas com seus termos
            List<PatternsPerTerms> patternsPerTermsList = new UtilClass().organizedPatternsPerTerms(patternDetections, termsCounters);
        
            List<String> catalog = new ArrayList<>();
            catalog.add("factory");
            catalog.add("create");
            catalog.add("concrete");
            
            return new NameOfTheClass().metricCalcule(patternsPerTermsList, projectName, catalog);
            
        } catch (JDOMException | IOException ex) {
            Logger.getLogger(AppPatternsPerTerms.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    
}

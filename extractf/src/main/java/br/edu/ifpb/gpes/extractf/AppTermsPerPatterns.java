/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.metrics.ClassName;
import br.edu.ifpb.gpes.extractf.models.Instance;
import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.Role;
import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.jdom2.JDOMException;

/**
 *
 * @author natan
 */
public class AppTermsPerPatterns {
    
    private static final String V_AXION = "../output/axion-1.0-M2/axion-1.0-M2_Matriz.csv";
    private static final String V_COLLECTIONS = "../output/collections-3.2.1/collections-3.2.1_Matriz.csv";
    private static final String V_XERCES = "../output/xerces-2.10.0/xerces-2.10.0_Matriz.csv";
    private static final String V_XALAN = "../output/xalan-2.7.1/xalan-2.7.1_Matriz.csv";
    private static final String V_JEXT = "../output/jext-5.0/jext-5.0_Matriz.csv";
    
    private static final String P_AXION = "../output/axion-1.0-M2/axion-1.0-M2.xml";
    private static final String P_COLLECTIONS = "../output/collections-3.2.1/collections-3.2.1.xml";
    private static final String P_XERCES = "../output/xerces-2.10.0/xerces-2.10.0.xml";
    private static final String P_XALAN = "../output/xalan-2.7.1/xalan-2.7.1.xml";
    private static final String P_JEXT = "../output/jext-5.0/jext-5.0.xml";
    
    public static void main(String[] args) throws IOException, JDOMException {
        List<TermsCounter> consumeOutput = new FileTermsCounter(new File(V_JEXT)).consumeOutput();
        List<PatternDetection> patternDetections = new FilePatternDetection(new File(P_JEXT)).readOutput();
        List<String> catalog = new ArrayList<>();
        catalog.add("factory");
        catalog.add("create");

        List<String> classesWithFactoryOrCreate = new ArrayList<>();

        List<TermsCounter> newListTermsCounter = new ArrayList<>();
        
        // Separando todas as classes que possuem esses termos
        consumeOutput.forEach(terms -> {
            terms.getTermsWithCounter().forEach((key, value) -> {
                if (key.equals("factory") || key.equals("create")) {
                    System.out.println(terms.getEntityName());

                    classesWithFactoryOrCreate.add(terms.getEntityName());
                    
                    newListTermsCounter.add(terms);
                }
            });
        });
        System.out.println("=> FactoryOrCreate: " + classesWithFactoryOrCreate.size() + "\n");
        
        Map<String, Integer> metricCalcule = new ClassName().metricCalcule(newListTermsCounter, catalog);
        for (Map.Entry<String, Integer> entry : metricCalcule.entrySet()) {
            String key = entry.getKey();
            Integer value = entry.getValue();
            
            System.out.println(String.format("%s; %s;", key, value));
        }
        System.out.println("=> MetricCalcule: " + metricCalcule.size() + "\n"); //15 (Axion)

        List<String> classesWithFactoryPattern = new ArrayList<>();
        patternDetections.forEach(pattern -> {
            if (pattern.getPatternName().equals("Factory Method")) {
                List<Instance> instances = pattern.getInstances();
                instances.forEach(instance -> {
                    List<Role> roles = instance.getRoles();
                    roles.forEach(role -> {
                        classesWithFactoryPattern.add(role.getElement());
                    });
                });
            }
        }); 
        System.out.println("=> FactoryPattern (Output pattern detection): " +classesWithFactoryPattern.size()+"\n"); //28 (Axion)

        // CalculeMetric & classesWithFactoryPattern
        List<String> patterns = new ArrayList<String>();
        for (Map.Entry<String, Integer> entry : metricCalcule.entrySet()) {
            for(int i = 0; i < classesWithFactoryPattern.size(); i++) {
                if(entry.getKey().equals(classesWithFactoryPattern.get(i)) && entry.getValue() > 0) {   
                    System.out.println(entry.getKey());
                    patterns.add(entry.getKey());
                }
            }
        }
        System.out.println("=> Patterns: (both outputs): " + patterns.size() + "\n");
        
        /*
            metricCalcule => Classe que sao padroes de acordo com a metrica. Ou seja, possuem termos referente ao factory method
            patterns => Sao as classes do metricCalcule que apareceram no output de detecçao de padroes de projeto
        */
        System.out.println("=> Quantidade de falsos padroes: " + (metricCalcule.size() - patterns.size()));
        
    }
}

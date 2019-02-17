/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.models.Instance;
import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.PatternsPerTerms;
import br.edu.ifpb.gpes.extractf.models.Role;
import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import br.edu.ifpb.gpes.extractf.readers.FilePatternDetection;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jdom2.JDOMException;

/**
 *
 * @author natan
 */
public class AppTermsPerPatterns {
    public static void main(String[] args) throws IOException, JDOMException {
        List<TermsCounter> consumeOutput = new FileTermsCounter().consumeOutput();
        List<PatternDetection> patternDetections = new FilePatternDetection().readOutput();
        
        List<String> classesWithFactoryOrCreate = new ArrayList<>();
        
        // Separando todas as classes que possuem esses termos
        consumeOutput.forEach(terms -> {
            terms.getTermsWithCounter().forEach((key, value) -> {
                if(key.equals("factory") || key.equals("create")) {
                    System.out.println(terms.getEntityName());
                    
                    classesWithFactoryOrCreate.add(terms.getEntityName());
                }
            });
        });
        System.out.println(classesWithFactoryOrCreate.size() + "\n\n");
        
        // YES => Esta no ouput de padroes   NO => Nao esta no output de padroes (TUDO COMO FACTORY)
        patternDetections.forEach(pattern -> {

            if (pattern.getNamePattern().equals("Factory Method")) {

                List<Instance> instances = pattern.getInstances();
                instances.forEach(instance -> {

                    List<Role> roles = instance.getRoles();
                    roles.forEach(role -> {

                        classesWithFactoryOrCreate.forEach(object -> {

                            if (role.getElement().equals(object)) {
                                System.out.println("YES:" + object);
                            } else {
                                System.out.println(" NO: " + object);
                            }

                        });

                    });

                });

            }

        });
        
        classesWithFactoryOrCreate.forEach(System.out::println);
    }
}

package br.edu.ifpb.gpes.extractf.utils;

import br.edu.ifpb.gpes.extractf.models.Instance;
import br.edu.ifpb.gpes.extractf.models.PatternDetection;
import br.edu.ifpb.gpes.extractf.models.PatternsPerTerms;
import br.edu.ifpb.gpes.extractf.models.Role;
import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author natan
 */
public class UtilClass {

    public UtilClass() {

    }

    public List<PatternsPerTerms> organizedPatternsPerTerms(List<PatternDetection> patternDetections, List<TermsCounter> termsCounters) {

        List<PatternsPerTerms> patternsPerTermsList = new ArrayList<>();

        patternDetections.forEach(pattern -> {

            if (pattern.getNamePattern().equals("Factory Method")) {

                List<Instance> instances = pattern.getInstances();
                instances.forEach(instance -> {

                    List<Role> roles = instance.getRoles();
                    roles.forEach(role -> {

                        termsCounters.forEach(objet -> {

                            if (role.getElement().equals(objet.getEntityName())) {

                                PatternsPerTerms ppt = new PatternsPerTerms();

                                // Set o nome do Padrao no Objeto
                                ppt.setNamePattern(pattern.getNamePattern());

                                // Set o nome da classe e os termos dela
                                ppt.setClassName(objet.getEntityName());
                                ppt.setTerms(objet);

                                patternsPerTermsList.add(ppt);

                            }

                        });

                    });

                });

            }

        });

        return patternsPerTermsList;
    }

    public List<PatternsPerTerms> organizedTermsPerPatterns(List<TermsCounter> termsCounters, List<PatternDetection> patternDetections) {
        List<PatternsPerTerms> termsPerPatterns = new ArrayList<>();

        termsCounters.forEach(object -> {
            patternDetections.forEach(pattern -> {

                if (pattern.getNamePattern().equals("Factory Method")) {

                    List<Instance> instances = pattern.getInstances();
                    instances.forEach(instance -> {

                        List<Role> roles = instance.getRoles();
                        roles.forEach(role -> {

                            if (object.getEntityName().equals(role.getElement())) {

                                PatternsPerTerms ppt = new PatternsPerTerms();

                                // Set o nome do Padrao no Objeto
                                ppt.setNamePattern(pattern.getNamePattern());

                                // Set o nome da classe e os termos dela
                                ppt.setClassName(object.getEntityName());
                                ppt.setTerms(object);

                                termsPerPatterns.add(ppt);
                            } else {
                                PatternsPerTerms ppt = new PatternsPerTerms();

                                // Set o nome do Padrao no Objeto
                                ppt.setNamePattern("Without pattern");

                                // Set o nome da classe e os termos dela
                                ppt.setClassName(object.getEntityName());
                                ppt.setTerms(object);

                                termsPerPatterns.add(ppt);
                            }

                        });

                    });

                }

            });
        });

        return termsPerPatterns;
    }

}

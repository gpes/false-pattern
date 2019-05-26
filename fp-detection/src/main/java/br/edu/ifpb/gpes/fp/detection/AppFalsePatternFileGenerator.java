package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.metrics.ClassName;
import br.edu.ifpb.gpes.fp.detection.readers.FileBenchmarking;
import br.edu.ifpb.gpes.fp.detection.readers.FileTermSets;
import br.edu.ifpb.gpes.shared.Benchmarking;
import br.edu.ifpb.gpes.shared.FalsePattern;
import br.edu.ifpb.gpes.shared.Instance;
import br.edu.ifpb.gpes.shared.Metric;
import br.edu.ifpb.gpes.shared.Role;
import br.edu.ifpb.gpes.shared.TermSet;
import br.edu.ifpb.gpes.shared.TermsCounter;
import br.edu.ifpb.gpes.shared.readers.FileProjectNames;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.json.JSONObject;

/**
 *
 * @author natan
 */
public class AppFalsePatternFileGenerator {
    
    public static final String DEV_TERMS = "devTerms";
    public static final String CATALOG_TERMS = "catalogTerms";
    public static final String UNION_TERMS = "unionTerms";

    public static void main(String[] args) throws IOException {
        FileProjectNames fileProjectNames = new FileProjectNames();
        List<String> readFile = fileProjectNames.readFile();
        
        // CATALOG_TERMS is the default set
        FileTermSets fileTermSets = new FileTermSets(new File(String.format("../terms/%s.json", CATALOG_TERMS)));
        List<TermSet> termSets = fileTermSets.readOutput();
        List<String> catalog = fileTermSets.pickATermList("factory method", termSets);
//        System.out.println(catalog);
       
        JSONObject jsonObject = new JSONObject();
        List<FalsePattern> falsePatterns = new ArrayList<>();

        readFile.forEach(projectName -> {
            Benchmarking benchmarking = new FileBenchmarking(new File(String.format("../benchmarking/%s.json", projectName))).readOutput();
            
            // Really useful
            List<TermsCounter> newListTermsCounterWithFactoryOrCreate = new ArrayList<>();

            // Separando todas as classes que possuem esses termos
            benchmarking.getTerms().stream().forEach(terms -> {
                terms.getTermsWithCounter().forEach((key, value) -> {
                    if (key.equals("factory") || key.equals("create")) {
//                        System.out.println(terms.getEntityName());
                        newListTermsCounterWithFactoryOrCreate.add(terms);
                    }
                });
            });

            // Separando as Entidades que fazem parte dos Factory Methods
            List<String> classesWithFactoryPattern = new ArrayList<>();
            benchmarking.getPatterns().stream().forEach(pattern -> {
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
            
            // classesWithFactoryPattern => Todas as classes que sao Factory Method de acordo com output de detecçao
            // metricCalcule => Todas as entidades que possuem os termos do catalogo com sua metrica calculada
            List<Metric> metrics = new ArrayList<>();
            Map<String, Integer> metricCalcule = new ClassName().metricCalcule(newListTermsCounterWithFactoryOrCreate, catalog);
            for (Map.Entry<String, Integer> entry : metricCalcule.entrySet()) {
                int numberExists = 0;
                for (int i = 0; i < classesWithFactoryPattern.size(); i++) {
                    if (entry.getKey().equals(classesWithFactoryPattern.get(i)) && entry.getValue() > 0) ++numberExists;
                }
                
                if(numberExists == 0) {
                    Metric metric = new Metric(entry.getKey(), entry.getValue());
                    metrics.add(metric);
                }
            }

            FalsePattern falsePattern = new FalsePattern(projectName, metrics);

            falsePatterns.add(falsePattern);
        });

        jsonObject.put("falsePatterns", falsePatterns);

        try (FileWriter fileWriter = new FileWriter("../false-patterns/falsePatterns.json")) {
            fileWriter.write(jsonObject.toString());
        }
        
//        try (FileWriter fileWriter = new FileWriter("../false-patterns/falsePatternsDevTerms.json")) {
//            fileWriter.write(jsonObject.toString());
//        }
        
//        try (FileWriter fileWriter = new FileWriter("../false-patterns/falsePatternsCatalogTerms.json")) {
//            fileWriter.write(jsonObject.toString());
//        }
        
//        try (FileWriter fileWriter = new FileWriter("../false-patterns/falsePatternsUnionTerms.json")) {
//            fileWriter.write(jsonObject.toString());
//        }
    }

}

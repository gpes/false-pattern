package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.metrics.ClassName;
import br.edu.ifpb.gpes.fp.detection.readers.FileBenchmarking;
import br.edu.ifpb.gpes.shared.Benchmarking;
import br.edu.ifpb.gpes.shared.FalsePattern;
import br.edu.ifpb.gpes.shared.Metric;
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

    public static void main(String[] args) throws IOException {
        FileProjectNames fileProjectNames = new FileProjectNames();
        List<String> readFile = fileProjectNames.readFile();

        List<String> catalog = new ArrayList<>();
        catalog.add("factory");
        catalog.add("create");

        JSONObject jsonObject = new JSONObject();
        List<FalsePattern> falsePatterns = new ArrayList<>();

        readFile.forEach(projectName -> {
            Benchmarking benchmarking = new FileBenchmarking(new File(String.format("../benchmarking/%s.json", projectName))).readOutput();
            Map<String, Integer> metricCalcule = new ClassName().metricCalcule(benchmarking.getTerms(), catalog);

            List<Metric> metrics = new ArrayList<>();

            for (Map.Entry<String, Integer> entry : metricCalcule.entrySet()) {
                String key = entry.getKey();
                Integer value = entry.getValue();

                Metric metric = new Metric(key, value);
                metrics.add(metric);
            }

            FalsePattern falsePattern = new FalsePattern(projectName, metrics);

            falsePatterns.add(falsePattern);
        });

        jsonObject.put("falsePatterns", falsePatterns);

        try (FileWriter fileWriter = new FileWriter("../falsePatterns.json")) {
            fileWriter.write(jsonObject.toString());
        }
    }

}

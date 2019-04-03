
package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.readers.FileFalsePatternDetection;
import br.edu.ifpb.gpes.fp.detection.readers.FileQualitasMetrics;
import br.edu.ifpb.gpes.shared.FalsePattern;
import br.edu.ifpb.gpes.shared.FalsePatternDetection;
import br.edu.ifpb.gpes.shared.Metric;
import br.edu.ifpb.gpes.shared.QualitasMetric;
import br.edu.ifpb.gpes.shared.readers.FileProjectNames;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import org.jdom2.JDOMException;

/**
 *
 * @author natan
 */
public class AppQualitasMetricsRelation {
    public static void main(String[] args) throws JDOMException, IOException {
        FalsePatternDetection falsePatternDetection = new FileFalsePatternDetection().readOutput();
        
        List<String> projectNames = new FileProjectNames().readFile();
        
        projectNames.stream().forEach(projectName -> {
            // Leitura para cada projeto
            List<QualitasMetric> qualitasMetrics = new FileQualitasMetrics(new File(String.format("../qualitas-metrics/%s", projectName)))
                    .readMetricFile();
            
            List<Metric> falsePatternMetrics = falsePatternDetection.getFalsePatterns().stream()
                    .filter(falsePattern -> falsePattern.getProjectName().equals(projectName))
                    .map(FalsePattern::getMetrics)
                    .findAny()
                    .orElse(Collections.EMPTY_LIST);
            
            StringBuilder builder = new StringBuilder();
            
            falsePatternMetrics.stream().forEach(fpMetric -> {
                String line = String.format(
                        "%s; %s; %s; %s; ",
                        projectName, fpMetric.getEntityName(), "factory", fpMetric.getMetricValue()
                );
                builder.append(line);
                
                qualitasMetrics.forEach(qualitasMetric -> {
                    Double qualitasMetricValue = qualitasMetric.getEntityValues().get(fpMetric.getEntityName());
                    String collumn = String.format("%d; ", qualitasMetricValue);
                    builder.append(collumn);
                });
                
                builder.append("\n");
            });
           
        });
        
//        StringBuilder builder = new StringBuilder();
//        
//        String line = String.format("%s; %d;\n", className, resultMetric);
//            builder.append(line);
//        
//            Path path = Paths.get("metric_" + projectName + ".csv");
//        
//        try {
//            Files.write(path, builder.toString().getBytes());
//        } catch (IOException ex) {
//            Logger.getLogger(NameOfTheClass.class.getName()).log(Level.SEVERE, null, ex);
//        }

//for (Map.Entry<String, Integer> entry : metricCalcule.entrySet()) {
        
    }
}

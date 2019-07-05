
package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.readers.FileFalsePatternDetection;
import br.edu.ifpb.gpes.fp.detection.readers.FileQualitasMetrics;
import br.edu.ifpb.gpes.shared.FalsePattern;
import br.edu.ifpb.gpes.shared.FalsePatternDetection;
import br.edu.ifpb.gpes.shared.Metric;
import br.edu.ifpb.gpes.shared.QualitasMetric;
import br.edu.ifpb.gpes.shared.readers.FileMetricIds;
import br.edu.ifpb.gpes.shared.readers.FileProjectNames;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.jdom2.JDOMException;

/**
 *
 * @author natan
 */
public class AppQualitasMetricsRelation {
    public static void main(String[] args) throws JDOMException, IOException {
        FalsePatternDetection falsePatternDetection = new FileFalsePatternDetection().readOutput();
        
        List<String> projectNames = new FileProjectNames().readFile();
        
        StringBuilder finalBuilder = new StringBuilder();
        
        List<String> metricIds = new FileMetricIds().readFile();
        finalBuilder.append("projectName,entityName,pattern,metricValue,");
        metricIds.forEach(id -> finalBuilder.append(String.format("%s,", id)));
        finalBuilder.append("\n");
        
        projectNames.stream().forEach(projectName -> {
            // Leitura para cada projeto
            List<QualitasMetric> qualitasMetrics = new FileQualitasMetrics(new File(String.format("../qualitas-metrics/%s", projectName)))
                    .readMetricFile();
            
            List<Metric> falsePatternMetrics = falsePatternDetection.getFalsePatterns()
                    .stream()
                    .filter(falsePattern -> falsePattern.getProjectName().equals(projectName))
                    .map(FalsePattern::getMetrics)
                    .findAny()
                    .orElse(Collections.EMPTY_LIST);
            
            falsePatternMetrics.stream().forEach(fpMetric -> {
                StringBuilder lineBuilder = new StringBuilder();
                
                String line = String.format(
                        "%s,%s,%s,%s,",
                        projectName, fpMetric.getEntityName(), "factory", fpMetric.getMetricValue()
                );
                lineBuilder.append(line);
                
                qualitasMetrics.forEach(qualitasMetric -> {
                    Double qualitasMetricValue = qualitasMetric.getEntityValues().get(fpMetric.getEntityName());
                    String collumn = String.format("%f,", qualitasMetricValue);
                    lineBuilder.append(collumn);
                });
                lineBuilder.append("\n");
                
                if(!lineBuilder.toString().contains("null,")) finalBuilder.append(lineBuilder.toString());
            });
           
        });
        
        Path path = Paths.get("../false-patterns/metricRelations.csv");
        
        try {
            Files.write(path, finalBuilder.toString().getBytes());
        } catch (IOException ex) {
            Logger.getLogger(AppQualitasMetricsRelation.class.getName()).log(Level.SEVERE, null, ex);
        }

        
    }
}

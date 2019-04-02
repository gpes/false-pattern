
package br.edu.ifpb.gpes.fp.detection.readers;

import br.edu.ifpb.gpes.shared.PatternDetection;
import br.edu.ifpb.gpes.shared.QualitasMetric;
import br.edu.ifpb.gpes.shared.readers.FileMetricIds;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

/**
 *
 * @author natan
 */
public class FileQualitasMetrics {
    private File filePath;

    public FileQualitasMetrics() {
        this(new File("../qualitas-metrics/axion-1.0-M2"));
    }

    public FileQualitasMetrics(File filePath) {
        this.filePath = filePath;
    }
    
    /**
     * Metodo para extrair informaçoes do arquivo de metricas do Qualitas class.
     * Este metodo deve ser chamado uma vez por projeto.
     * @return Uma lista contendo o id da metrica e um conjunto com cada entidade e seu valor da metrica
     * @throws JDOMException
     * @throws IOException 
     */
    public List<QualitasMetric> readMetricFile() throws JDOMException, IOException {
        List<QualitasMetric> qualitasMetrics = new ArrayList<>();
        
        SAXBuilder builder = new SAXBuilder();
        
        // Lendo o arquivo xml
        Document document = (Document) builder.build(this.filePath);
        
        // Element Metrics (Root)
        Element rootElement = (Element) document.getRootElement();
        
        List<Element> children = rootElement.getChildren();
        
        List<String> metricIds = new FileMetricIds().readFile();
        
        metricIds.forEach(metricId -> {
            // child -> <Metric>
            children.stream().forEach(child -> {
                String id = child.getAttributeValue("id");
                
                if(id.equals(metricId)) {
                    List<Element> values = child.getChildren().get(0).getChildren();
                    
                    // Iterar em values e pegar cada entidade e seu valor
                }
            });
        });
        

        return qualitasMetrics;
    }
}

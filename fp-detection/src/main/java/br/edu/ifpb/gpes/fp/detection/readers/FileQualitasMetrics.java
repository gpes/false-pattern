package br.edu.ifpb.gpes.fp.detection.readers;

import br.edu.ifpb.gpes.shared.QualitasMetric;
import br.edu.ifpb.gpes.shared.readers.FileMetricIds;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
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
     *
     * @return Uma lista contendo o id da metrica e um conjunto com cada
     * entidade e seu valor da metrica
     * @throws JDOMException
     * @throws IOException
     */
    public List<QualitasMetric> readMetricFile() {
        List<QualitasMetric> qualitasMetrics = new ArrayList<>();

        try {
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
                    String id = child.getAttributeValue("id") != null ? child.getAttributeValue("id") : "none";

                    if (id.equals(metricId)) {
                        QualitasMetric qualitasMetric = new QualitasMetric();
                        qualitasMetric.setMetricId(metricId);

                        // <Value>
                        List<Element> values = child.getChildren().get(0).getChildren();

                        Map<String, Double> entityValues = new HashMap<>();

                        values.stream().forEach(value -> {
                            entityValues.put(
                                    String.format("%s.%s", value.getAttributeValue("package"), value.getAttributeValue("name")),
                                    Double.parseDouble(value.getAttributeValue("value"))
                            );
                        });

                        qualitasMetric.setEntityValue(entityValues);

                        qualitasMetrics.add(qualitasMetric);
                    }
                });
            });
        } catch (JDOMException ex) {
            Logger.getLogger(FileQualitasMetrics.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(FileQualitasMetrics.class.getName()).log(Level.SEVERE, null, ex);
        }

        return qualitasMetrics;
    }
}

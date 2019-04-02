
package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.readers.FileQualitasMetrics;
import java.io.IOException;
import org.jdom2.JDOMException;

/**
 *
 * @author natan
 */
public class AppQualitasMetricsRelation {
    public static void main(String[] args) throws JDOMException, IOException {
        new FileQualitasMetrics().readMetricFile();
    }
}

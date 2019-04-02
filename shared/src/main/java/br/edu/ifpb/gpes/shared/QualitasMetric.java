
package br.edu.ifpb.gpes.shared;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author natan
 */
public class QualitasMetric {
    private String metricId;
    private Map<String, Integer> entityValue;
    
    public QualitasMetric() {
        this.entityValue = new HashMap<>();
    }

    public QualitasMetric(String metricId, Map<String, Integer> entityValue) {
        this.metricId = metricId;
        this.entityValue = entityValue;
    }

    public String getMetricId() {
        return metricId;
    }

    public void setMetricId(String metricId) {
        this.metricId = metricId;
    }

    public Map<String, Integer> getEntityValue() {
        return entityValue;
    }

    public void setEntityValue(Map<String, Integer> entityValue) {
        this.entityValue = entityValue;
    }

    @Override
    public String toString() {
        return "QualitasMetric{" + "metricId=" + metricId + ", entityValue=" + entityValue + '}';
    }
}


package br.edu.ifpb.gpes.shared;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author natan
 */
public class QualitasMetric {
    private String metricId;
    private Map<String, Double> entityValues;
    
    public QualitasMetric() {
        this.entityValues = new HashMap<>();
    }

    public QualitasMetric(String metricId, Map<String, Double> entityValues) {
        this.metricId = metricId;
        this.entityValues = entityValues;
    }

    public String getMetricId() {
        return metricId;
    }

    public void setMetricId(String metricId) {
        this.metricId = metricId;
    }

    public Map<String, Double> getEntityValues() {
        return entityValues;
    }

    public void setEntityValue(Map<String, Double> entityValues) {
        this.entityValues = entityValues;
    }

    @Override
    public String toString() {
        return "QualitasMetric{" + "metricId=" + metricId + ", entityValues=" + entityValues + '}';
    }
}

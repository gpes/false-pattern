
package br.edu.ifpb.gpes.shared;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author natan
 */
public class FalsePattern {
    private String projectName;
    private List<Metric> metrics;

    public FalsePattern() {
        this.metrics = new ArrayList<>();
    }

    public FalsePattern(String projectName, List<Metric> metrics) {
        this.projectName = projectName;
        this.metrics = metrics;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public List<Metric> getMetrics() {
        return metrics;
    }

    public void setMetrics(List<Metric> metrics) {
        this.metrics = metrics;
    }

    @Override
    public String toString() {
        return "FalsePattern{" + "projectName=" + projectName + ", metrics=" + metrics + '}';
    }
}

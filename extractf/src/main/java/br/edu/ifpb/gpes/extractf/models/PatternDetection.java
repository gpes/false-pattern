
package br.edu.ifpb.gpes.extractf.models;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author natan
 * $1.xml
 */
public class PatternDetection {
    
    private String patternName;
    private List<Instance> instances;
    
    public PatternDetection() {
        this.instances = new ArrayList<>();
    }

    public PatternDetection(String patternName) {
        this();
        this.patternName = patternName;
    }

    public String getPatternName() {
        return patternName;
    }

    public void setPatternName(String patternName) {
        this.patternName = patternName;
    }

    public List<Instance> getInstances() {
        return instances;
    }

    public void addInstance(Instance instance) {
        this.instances.add(instance);
    }

    @Override
    public String toString() {
        return "PatternDetection{" + "patternName=" + patternName + ", instances=" + instances + '}';
    }
    
}

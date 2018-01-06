
package br.edu.ifpb.gpes.extractf.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author natan
 */
public class PatternDetection {
    
    private String namePattern;
    private List<Instance> instances;
    
    public PatternDetection() {
        this.instances = new ArrayList<Instance>();
    }

    public PatternDetection(String namePattern) {
        this();
        this.namePattern = namePattern;
    }

    public String getNamePattern() {
        return namePattern;
    }

    public void setNamePattern(String namePattern) {
        this.namePattern = namePattern;
    }

    public List<Instance> getInstances() {
        return instances;
    }

    public void setInstances(List<Instance> instances) {
        this.instances = instances;
    }

    @Override
    public String toString() {
        return "PatternDetection{" + "namePattern=" + namePattern + ", instances=" + instances + '}';
    }
    
}


package br.edu.ifpb.gpes.extractf.models;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author natan
 * $1.xml
 */
public class PatternDetection {
    
    private String namePattern;
    private List<Role> instances;
    
    public PatternDetection() {
        this.instances = new ArrayList<>();
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

    public List<Role> getInstances() {
        return instances;
    }

    public void addInstance(Role instance) {
        this.instances.add(instance);
    }

    @Override
    public String toString() {
        return "PatternDetection{" + "namePattern=" + namePattern + ", instances=" + instances + '}';
    }
    
}

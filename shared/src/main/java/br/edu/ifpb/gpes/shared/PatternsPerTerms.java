
package br.edu.ifpb.gpes.shared;

/**
 *
 * @author natan
 */
public class PatternsPerTerms {
    private String namePattern;
    private String className;
    private TermsCounter terms;
//    private Map<Instance, TermsCounter> instancesPerTerms;
    
    public PatternsPerTerms() {
//        this.instancesPerTerms = new HashMap<>();
    }

    public String getNamePattern() {
        return namePattern;
    }

    public void setNamePattern(String namePattern) {
        this.namePattern = namePattern;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public TermsCounter getTerms() {
        return terms;
    }

    public void setTerms(TermsCounter terms) {
        this.terms = terms;
    }
    
    

//    public Map<Instance, TermsCounter> getInstancesPerTerms() {
//        return instancesPerTerms;
//    }
//
//    public void setInstancesPerTerms(Map<Instance, TermsCounter> instancesPerTerms) {
//        this.instancesPerTerms = instancesPerTerms;
//    }
//    
//    public void putInstancesPerTermsd(Instance key, TermsCounter value) {
//        this.instancesPerTerms.put(key, value);
//    }

    @Override
    public String toString() {
        return "PatternsPerTerms{" + "namePattern=" + namePattern + ", className=" + className + ", terms=" + terms + '}';
    }
    
    
}

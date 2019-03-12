
package br.edu.ifpb.gpes.shared;

import java.util.HashMap;

/**
 *
 * @author natan
 * $1_Matriz.csv
 */
public class TermsCounter {
    private String entityName;
    private HashMap<String, Integer> termsWithCounter;
    
    public TermsCounter() {
        this.termsWithCounter = new HashMap<>();
    }
    
    public TermsCounter(String entityName) {
        this();
        this.entityName = entityName;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public HashMap<String, Integer> getTermsWithCounter() {
        return termsWithCounter;
    }

    public void setTermsWithCounter(HashMap<String, Integer> termsWithCounter) {
        this.termsWithCounter = termsWithCounter;
    }
    
    public void putTermsWithCounter(String key, Integer value) {
        this.termsWithCounter.put(key, value);
    }

    @Override
    public String toString() {
        return "TermsCounter{" + "entityName=" + entityName + ", termsWithCounter=" + termsWithCounter + '}';
    }
    
    
}

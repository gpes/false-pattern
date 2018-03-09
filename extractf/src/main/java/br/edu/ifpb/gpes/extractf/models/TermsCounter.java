/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf.models;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author natan
 * $1_Matriz.csv
 */
public class TermsCounter {
    private String entityName;
    private HashMap<String, String> termsWithCounter;
    
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

    public HashMap<String, String> getTermsWithCounter() {
        return termsWithCounter;
    }

    public void setTermsWithCounter(HashMap<String, String> termsWithCounter) {
        this.termsWithCounter = termsWithCounter;
    }
    
    public void putTermsWithCounter(String key, String value) {
        this.termsWithCounter.put(key, value);
    }

    @Override
    public String toString() {
        return "TermsCounter{" + "entityName=" + entityName + ", termsWithCounter=" + termsWithCounter + '}';
    }
    
    
}

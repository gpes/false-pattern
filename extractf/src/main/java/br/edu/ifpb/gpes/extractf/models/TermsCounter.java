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
 */
public class TermsCounter {
    private String entityName;
    private Map<String, Integer> termsWithCounter;
    
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

    public Map<String, Integer> getTermsWithCounter() {
        return termsWithCounter;
    }

    public void setTermsWithCounter(Map<String, Integer> termsWithCounter) {
        this.termsWithCounter = termsWithCounter;
    }

    @Override
    public String toString() {
        return "TermsCounter{" + "entityName=" + entityName + ", termsWithCounter=" + termsWithCounter + '}';
    }
    
    
}

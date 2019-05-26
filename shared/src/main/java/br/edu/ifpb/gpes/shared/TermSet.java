/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.shared;

import java.util.List;

/**
 *
 * @author natan
 */
public class TermSet {
    private String patternName;
    private List<String> terms;

    public TermSet() {
    }

    public TermSet(String patternName, List<String> terms) {
        this.patternName = patternName;
        this.terms = terms;
    }

    public String getPatternName() {
        return patternName;
    }

    public void setPatternName(String patternName) {
        this.patternName = patternName;
    }

    public List<String> getTerms() {
        return terms;
    }

    public void setTerms(List<String> terms) {
        this.terms = terms;
    }

    @Override
    public String toString() {
        return "TermSet{" + "patternName=" + patternName + ", terms=" + terms + '}';
    }
}

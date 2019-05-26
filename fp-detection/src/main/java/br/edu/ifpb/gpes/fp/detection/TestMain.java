/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.fp.detection;

import br.edu.ifpb.gpes.fp.detection.readers.FileTermSets;
import br.edu.ifpb.gpes.shared.TermSet;
import java.io.File;
import java.util.List;

/**
 *
 * @author natan
 */
public class TestMain {
    public static void main(String[] args) {
        FileTermSets fileTermSets = new FileTermSets(new File(String.format("../terms/%s.json", "unionTerms")));
        List<TermSet> termSets = fileTermSets.readOutput();
        System.out.println(termSets.get(0).getTerms());
    }
}

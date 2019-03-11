/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import java.io.IOException;
import java.util.List;
import org.json.JSONObject;

/**
 *
 * @author natan
 */
public class AppTermsCounter {
    public static void main(String[] args) throws IOException {
        FileTermsCounter fileTermsCounter = new FileTermsCounter();
        
        List<TermsCounter> consumeOutput = fileTermsCounter.consumeOutput();
//        consumeOutput.forEach(terms -> {
//            System.out.println(terms);
//        });
        
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("terms", consumeOutput);
        
        System.out.println(jsonObject);
    }
}

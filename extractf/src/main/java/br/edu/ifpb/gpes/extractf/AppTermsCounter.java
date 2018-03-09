/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf;

import br.edu.ifpb.gpes.extractf.readers.FileTermsCounter;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author natan
 */
public class AppTermsCounter {
    public static void main(String[] args) {
        FileTermsCounter fileTermsCounter = new FileTermsCounter();
        
        try { 
            fileTermsCounter.consumeOutput();
        } catch (IOException ex) {
            Logger.getLogger(AppPatternDetection.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.extractf.readers;

import br.edu.ifpb.gpes.extractf.models.TermsCounter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

/**
 *
 * @author natan
 */
public class FileTermsCounter {
    
    private File filePath;
    private Iterable<CSVRecord> records;
    
    private List<TermsCounter> termsCounterList;
    
    public FileTermsCounter() {
        this.filePath = new File("../output/axion-1.0-M2_Matriz.csv");
        this.records = this.proccessFile();
        
        this.termsCounterList = new ArrayList<>();
    }
    
    public void consumeOutput() throws FileNotFoundException, IOException {
        
        int lineIndex = 0;
        
        for(CSVRecord record : this.records) {
            if(lineIndex == 0) {
                for(int i = 1; i < record.size(); i++) {
                    TermsCounter termsCounter = new TermsCounter();
                    termsCounter.setEntityName(record.get(i));
                    this.termsCounterList.add(termsCounter);
                }
            } else {
                for(int j = 1; j < record.size(); j++) {
                    if(record.get(j).equals("0")) {
                    } else this.termsCounterList.get(j-1).putTermsWithCounter(record.get(0), record.get(j));
                }
            }
            
            ++lineIndex;
        }
        
        this.termsCounterList.stream().forEach(action -> {
            System.out.println(action.getEntityName());
            action.getTermsWithCounter().forEach((k, v) -> System.out.println("\t" + k + ": " + v));
        });
    }
    
    // Metodo para ler o arquivo csv de termos
    private Iterable<CSVRecord> proccessFile() {
        try {
            Reader reader = new FileReader(this.filePath);
            return CSVFormat.RFC4180.parse(reader);
        } catch (FileNotFoundException ex) {
            Logger.getLogger(FileTermsCounter.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(FileTermsCounter.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return null;
    }
    
    
}

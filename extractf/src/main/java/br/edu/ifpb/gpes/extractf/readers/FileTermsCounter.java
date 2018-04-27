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
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
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
        this(new File("../output/axion-1.0-M2/axion-1.0-M2_Matriz.csv"));
    }
    
    public FileTermsCounter(File filePath) {
        this.filePath = filePath;
        this.records = this.proccessFile();
        
        this.termsCounterList = new ArrayList<>();
    }
    
    public List<TermsCounter> consumeOutput() throws FileNotFoundException, IOException {
        
        int lineIndex = 0;
        
        for(CSVRecord record : this.records) {
            if(lineIndex == 0) {
                for(int i = 1; i < record.size(); i++) {
                    TermsCounter termsCounter = new TermsCounter();
                    String entityName = record.get(i);
//                    entityName = entityName.replace("/", "");
//                    entityName = entityName.replace(":", "");
                    String[] parts = entityName.split(":");
                    entityName = parts[1];
                    termsCounter.setEntityName(entityName);
                    this.termsCounterList.add(termsCounter);
                }
            } else {
                for(int j = 1; j < record.size(); j++) {
                    if(record.get(j).equals("0")) {
                    } else this.termsCounterList.get(j-1).putTermsWithCounter(record.get(0), Integer.parseInt(record.get(j)));
                }
            }
            
            ++lineIndex;
        }
        
        this.termsCounterList.stream().forEach(action -> {
            action.setTermsWithCounter(this.sortByValues(action.getTermsWithCounter()));
        });
        
        return this.termsCounterList;
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
    
    private HashMap sortByValues(HashMap hashMap) {
        List list = new LinkedList(hashMap.entrySet());
        
        Collections.sort(list, new Comparator(){
            @Override
            public int compare(Object o1, Object o2) {
                return ((Comparable) ((Map.Entry) (o2)).getValue()).compareTo(((Map.Entry) (o1)).getValue());
            }
        });
        
        HashMap sortedHashMap = new LinkedHashMap();
        for(Iterator iterator = list.iterator(); iterator.hasNext();) {
            Map.Entry entry = (Map.Entry) iterator.next();
            sortedHashMap.put(entry.getKey(), entry.getValue());
        }
        
        return sortedHashMap;
    }
    
    
}
